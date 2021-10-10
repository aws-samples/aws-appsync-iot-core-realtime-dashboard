import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { API, graphqlOperation } from 'aws-amplify';
import { GetSensor, GetSensorTypes } from '../../api/Sensors';
import { Box, Header, SegmentedControl, SpaceBetween, BreadcrumbGroup } from '@awsui/components-react';
import SensorValuePanel from '../../components/SensorValuePanel'
import SensorChart from '../../components/SensorChart';
import { onCreateSensorValue } from '../../graphql/subscriptions';

interface ISensorSubscriptionResponse {
    value: {
      data: {
        onCreateSensorValue: {
          name: string,
          pH: number,
          temperature: number,
          salinity: number,
          disolvedO2: number
        }
      }
    }
}

const SensorPage: React.FC = () => {

    const sensorTypes = GetSensorTypes()

    const [selectedSensor, setSelectedSensor] = useState("temperature");
    const [name, setName] = useState("Fetching sensor data...");
    const [value, setValue] = useState<ISensorSubscriptionResponse | null>(null);

    const { id } = useParams() as { 
        id: string;
    }

    const GetSelectedValue = () : number | null | undefined => {

        let n: number | null | undefined = null;

        let v = value?.value.data.onCreateSensorValue

        if (selectedSensor === 'temperature') {
            n = v?.temperature
        } else if (selectedSensor === 'salinity') {
            n = v?.salinity
        } else if (selectedSensor === 'disolvedO2') {
            n = v?.disolvedO2
        } else if (selectedSensor === 'ph') {
            n = v?.pH
        }

        return n;
    }

    //fetch sensor to get name
    useEffect(() => {

            const initSensor = async () => {
            
            console.log('fetching sensor');

            try {

                const response = await GetSensor(id || "");

                if (response) {
                    setName(response.name);
                    console.log('sensor retrived');
                }
            }
            catch (error) {
                console.log('error fetching sensor', error);
            }
        };

        initSensor()

    }, [id]);
    
    // start subscription for sensor value changes
    useEffect(() => {

        // @ts-ignore
        const subscription = API.graphql(graphqlOperation(onCreateSensorValue, {sensorId: id})).subscribe({
            next: (response: ISensorSubscriptionResponse) => {
                console.log('sensor value received')
                setValue(response)
            },
            error: (error: any) => console.warn(error),
         });
      
        return () => {
            subscription.unsubscribe()
            console.log('subscription cancelled')
        };
    }, [id]);

    return (
        <Box margin={{ bottom: "l", top: "s" }} padding="xxs">
            <BreadcrumbGroup
                items={[
                    { text: "Sensor Map", href: "#" },
                    { text: "Sensor", href: "#sensor" },
                ]}
                ariaLabel="Breadcrumbs"
            />
            <Header variant="h1"
            actions={
                <SegmentedControl
                    selectedId={selectedSensor}
                    onChange={({ detail }) => {
                        setValue(null)
                        setSelectedSensor(detail.selectedId)
                        }
                    }
                    label="Sensor Values"
                    options={sensorTypes}
              />
            }
            >
                {name}
            </Header>
            <SpaceBetween size="xl">
                <SensorValuePanel value={GetSelectedValue()} />
                <SensorChart title={selectedSensor} value={GetSelectedValue()}/>
            </SpaceBetween>
        </Box>
    )
}

export default SensorPage;
