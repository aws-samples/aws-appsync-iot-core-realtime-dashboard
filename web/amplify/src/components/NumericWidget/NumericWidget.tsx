import React, { useState, useEffect } from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        height: 175
    },
    title: {
        fontSize:20
    },
    value: {
        fontSize:75,
        marginTop:10,
        marginLeft:'auto',
        marginRight:'auto'
    }
}));

export enum WIDGET_MODE {
    CURRENT,
    AVG,
    MIN,
    MAX
}

interface IProps {
    mode: WIDGET_MODE,
    title: string,
    value: number | null
}

interface IValues {
    count: number,
    total: number,
    avg: number,
    current: number,
    min: number,
    max: number
}

const NumericWidget: React.FC<IProps> = ({mode, title, value}: IProps) => {
  
  const classes = useStyles();

  const [values, setValues] = useState<IValues>({
    count: 0,
    total: 0,
    current: 0,
    avg: 0,
    min: 0,
    max: 0
  })

  useEffect(() => {

    const UpdateValues = (value : number)=> {

      const newValues = { ...values };

      newValues.current = value;
      newValues.count = newValues.count + 1;
      newValues.total = newValues.total + value;
      newValues.avg = parseFloat((newValues.total / newValues.count).toFixed(1));

      if (value > newValues.max) {
        newValues.max = value;
      }
  
      if (newValues.min === 0 || value < newValues.min) {
        newValues.min = value;
      }

      setValues(newValues);
    }

    if (value) {
      UpdateValues(value);
    }

    // eslint-disable-next-line
  }, [value]);

  return (
    <Paper className={classes.paper}>
        <div className={classes.title}>
            {title}
        </div>
        <div className={classes.value}>
            { !value && 
                <CircularProgress color="secondary" />
            }
            { value && mode === WIDGET_MODE.AVG &&
                values.avg
            }
            { value && mode === WIDGET_MODE.CURRENT &&
                values.current
            }
            { value && mode === WIDGET_MODE.MIN &&
                values.min
            }
            { value && mode === WIDGET_MODE.MAX &&
                values.max
            }
        </div>
    </Paper>  
  );
}

export default NumericWidget;
