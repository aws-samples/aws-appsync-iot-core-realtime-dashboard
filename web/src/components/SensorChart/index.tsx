import React, { useEffect, useRef } from 'react';
import { Box, Container, LineChart } from '@awsui/components-react';
import Spinner from "@awsui/components-react/spinner";

interface IProps {
    title: string
    value: number | null | undefined
}

interface IChartValue {
    x: Date,
    y: number
}

const SensorChart: React.FC<IProps> = ({title, value}: IProps) => {

    const values = useRef<Array<IChartValue>>([])
    const startDate = useRef(new Date())
    const endDate = useRef(new Date())

    useEffect(() => {

        const x = new Date()

        if (value) {

            // if initial chart time range exceeds size - push out by 5 minues
            if (x >= endDate.current) {
                endDate.current = new Date(x.getTime() + 3*60000)
            }

            values.current = [...values.current,{ x: x, y:value }]
        } else {

            // initialize chart with a 5 minute time range
            startDate.current = x
            endDate.current = new Date(x.getTime() + 3*60000)
            values.current = []
        }

    }, [value]);

    return (
        <Container>
            <Box margin={{ bottom: "s", top: "s" }} padding="xxs">
                    { !value && 
                        <Box textAlign="center">
                            <Spinner size="normal" />
                        </Box>
                    }
                    {
                        value && 
                            <LineChart
                                series={[
                                    {
                                        title: title,
                                        type: 'line',
                                        data: values.current
                                    }
                                ]}
                                i18nStrings={{
                                    xTickFormatter: e =>
                                      e.toISOString().substr(11, 8)
                                }}
                                yDomain={[0, 100]}
                                xDomain={[startDate.current, endDate.current]}
                                height={300}
                                hideFilter
                                xScaleType="time"
                            />
                    }
            </Box>
        </Container>
    )
}

export default SensorChart;