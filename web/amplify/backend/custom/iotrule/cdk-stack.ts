import * as cdk from '@aws-cdk/core';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import * as iam from '@aws-cdk/aws-iam';
import * as iot from '@aws-cdk/aws-iot';
import * as actions from '@aws-cdk/aws-iot-actions';
import * as Lambda from '@aws-cdk/aws-lambda';

export class cdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
    super(scope, id, props);
    /* Do not remove - Amplify CLI automatically injects the current deployment environment in this input parameter */
    new cdk.CfnParameter(this, 'env', {
      type: 'String',
      description: 'Current Amplify CLI env name',
    });
    
    /* AWS CDK code goes here - learn more: https://docs.aws.amazon.com/cdk/latest/guide/home.html */
    const dependencies: AmplifyDependentResourcesAttributes = AmplifyHelpers.addResourceDependency(this,
      amplifyResourceProps.category,
      amplifyResourceProps.resourceName,
      [
        {
          category: "function",
          resourceName: "createsensorvalue"
        }
      ] 
    );

    const createSensorValueRole = iam.Role.fromRoleArn(this, "CreateSensorValueRole", 
      cdk.Fn.ref(dependencies.function.createsensorvalue.LambdaExecutionRoleArn)
    )

    const createSensorValueFunction = Lambda.Function.fromFunctionAttributes(this, 'CreateSensorValueFunction',
      {
        functionArn: cdk.Fn.ref(dependencies.function.createsensorvalue.Arn),
        role: createSensorValueRole,
        sameEnvironment: true
      }
    )

    new iot.TopicRule(this, 'CreateSensorValueRule', {
      sql: iot.IotSql.fromStringAsVer20160323("select * as data, topic(4) as sensorId from 'dt/bay-health/SF/+/sensor-value'"),
      actions: [new actions.LambdaFunctionAction(createSensorValueFunction)]
    });
 }
}
