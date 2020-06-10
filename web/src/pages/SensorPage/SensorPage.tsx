import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { API, graphqlOperation } from 'aws-amplify';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { onCreateSensorValue } from '../../graphql/subscriptions';
import { GetSensor } from '../../api/Sensors';
import NumericWidget, { WIDGET_MODE } from '../../components/NumericWidget/NumericWidget';
import LineChartWidget from '../../components/LineChartWidget/LineChartWidget';

const useStyles = makeStyles(() => ({
  dashboardContainer: {
    marginTop:100
  },
  title: {
    marginBottom: 20,
    minHeight:30
  }
}));

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
  
  const classes = useStyles();
  const { id } = useParams();

  const [name, setName] = useState("Fetching sensor data...");
  const [pH, setPH] = useState<number | null>(null);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [salinity, setSalinity] = useState<number | null>(null);
  const [disolvedO2, setDisolvedO2] = useState<number | null>(null);
  const [readyToSubscribe, setReadyToSubscribe] = useState(false);

  //fetch sensor to get name
  useEffect(() => {

    setReadyToSubscribe(false);

    const initSensor = async () => {
      
      console.log('fetching sensor');

      try {

        const response = await GetSensor(id || "");

        if (response) {
          setName(response.name);
          console.log('sensor retrived');
          setReadyToSubscribe(true);
        }
      }
      catch (error) {
        console.log('error fetching sensor', error);
      }
    };

    initSensor()

  }, [id]);

  //subscribe to changes to the sensor's value
  useEffect(() => {  

    if (readyToSubscribe){
    
      console.log('start subscription to sensor');

      const subscriber = API.graphql(graphqlOperation(onCreateSensorValue, {sensorId: id})).subscribe({
        next: (response: ISensorSubscriptionResponse) => {
  
          //update the sensor's status in state
          if (response.value.data.onCreateSensorValue) {

            setPH(response.value.data.onCreateSensorValue.pH);
            setTemperature(response.value.data.onCreateSensorValue.temperature);
            setSalinity(response.value.data.onCreateSensorValue.salinity);
            setDisolvedO2(response.value.data.onCreateSensorValue.disolvedO2);

            console.log('sensor value received');
          }
        },
        error: (error: any) => {
          console.log('error on sensor subscription', error);
        }
      });

      return () => {
        console.log('terminating subscription to sensor');
        subscriber.unsubscribe();
      }
    }
      
  }, [id, readyToSubscribe]);

  return (

    <Container className={classes.dashboardContainer} maxWidth="lg">
      <div className={classes.title}>
        <Typography variant="h5" align="left" >
            {name}
        </Typography>
      </div>

      <Grid container spacing={4}>

        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <NumericWidget
            mode={WIDGET_MODE.CURRENT}
            title="pH"
            value={pH}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <NumericWidget
            mode={WIDGET_MODE.CURRENT}
            title="Temperature"
            value={temperature}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <NumericWidget
            mode={WIDGET_MODE.CURRENT}
            title="Salinity"
            value={salinity}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <NumericWidget
            mode={WIDGET_MODE.CURRENT}
            title="Disolved O2"
            value={disolvedO2}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <LineChartWidget
            title="pH"
            value={pH}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <LineChartWidget
            title="Temperature"
            value={temperature}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <LineChartWidget
            title="Salinity"
            value={salinity}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <LineChartWidget
            title="Disolved O2"
            value={disolvedO2}
          />
        </Grid>
      </Grid>

    </Container>
  );
}

export default SensorPage;
