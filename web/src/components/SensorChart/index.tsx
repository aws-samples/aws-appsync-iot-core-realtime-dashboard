import React, { useEffect, useRef } from 'react';
import { Box, Container, LineChart } from '@awsui/components-react';
import Spinner from "@awsui/components-react/spinner";

interface IProps {
    title: string
    value: number | null
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
            endDate.current = x
            values.current = [...values.current,{ x: x, y:value }]
        } else {
            startDate.current = x
            endDate.current = x
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