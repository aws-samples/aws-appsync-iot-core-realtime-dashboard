import * as cdk from 'aws-cdk-lib';
import * as AmplifyHelpers from '@aws-amplify/cli-extensibility-helper';
import { AmplifyDependentResourcesAttributes } from '../../types/amplify-dependent-resources-ref';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as Lambda from 'aws-cdk-lib/aws-lambda';
import * as iot from 'aws-cdk-lib/aws-iot';

export class cdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps, amplifyResourceProps?: AmplifyHelpers.AmplifyResourceProps) {
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
    );

    const createSensorValueFunction = Lambda.Function.fromFunctionAttributes(this, 'CreateSensorValueFunction',
      {
        functionArn: cdk.Fn.ref(dependencies.function.createsensorvalue.Arn),
        role: createSensorValueRole,
        sameEnvironment: true
      }
    );

    const rule = new iot.CfnTopicRule(this, 'CreateSensorValueRule', {
      topicRulePayload: {
        sql: "select * as data, topic(4) as sensorId from 'dt/bay-health/SF/+/sensor-value'",
        actions: [ 
          {
            lambda: {
              functionArn: createSensorValueFunction.functionArn
            }
          }
        ]
      },
    });

    createSensorValueFunction.addPermission('AllowIoTInvoke', {
      principal: new iam.ServicePrincipal('iot.amazonaws.com'),
      sourceArn: rule.attrArn
    });
  }
}