import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { API, graphqlOperation } from 'aws-amplify';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { onUpdateSensor } from '../../graphql/subscriptions';
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
      onUpdateSensor: {
        name: string,
        value: number
      }
    }
  }
}

const SensorPage: React.FC = () => {
  
  const classes = useStyles();
  const { id } = useParams();

  const [name, setName] = useState("Fetching sensor data...");
  const [value, setValue] = useState<number | null>(null);

  //subscribe to changes to the sensor's value
  useEffect(() => {  

      console.log('start subscription to sensor');

      const subscriber = API.graphql(graphqlOperation(onUpdateSensor, {id: id})).subscribe({
        next: (response: ISensorSubscriptionResponse) => {
  
          //update the sensor's status in state
          if (response.value.data.onUpdateSensor) {
            setName(response.value.data.onUpdateSensor.name)
            setValue(response.value.data.onUpdateSensor.value)

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
      
  }, [id]);

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
            title="Current Value"
            value={value}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <NumericWidget
            mode={WIDGET_MODE.MIN}
            title="Min"
            value={value}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <NumericWidget
            mode={WIDGET_MODE.MAX}
            title="Max"
            value={value}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
          <NumericWidget
            mode={WIDGET_MODE.AVG}
            title="Avg"
            value={value}
          />
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <LineChartWidget
            title="Values"
            value={value}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SensorPage;
