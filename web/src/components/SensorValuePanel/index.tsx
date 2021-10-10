import React, { useEffect, useRef } from 'react';
import { Box, Container, ColumnLayout, Spinner } from '@awsui/components-react';

interface IProps {
    value: number | null | undefined
}

const SensorValuePanel: React.FC<IProps> = ({value}: IProps) => {

    const min = useRef(0)
    const max = useRef(0)
    const avg = useRef(0)
    const total = useRef(0)
    const current = useRef(0)
    const count = useRef(0)

    useEffect(() => {

        const updateValues = (value : number) => {
        
            current.current = value
            count.current += 1
            total.current += value

            if (count.current > 0) {
                avg.current = (parseFloat((total.current / count.current).toFixed(1)))
            } else {
                avg.current = value
            }

            if (value > max.current) {
                max.current = value
            }

            if (min.current === 0 || value < min.current) {
                min.current = value;
            }
        }

        if (value) {
            updateValues(value)
        } else {
            avg.current = 0
            max.current = 0
            min.current = 0
            current.current = 0
            count.current = 0
            total.current = 0
        }

    }, [value]);

    return (

        <Container>
            <ColumnLayout columns={4} variant="text-grid">
                <div>
                    <Box margin={{ bottom: 'xxxs' }} color="text-label" fontSize="heading-s">
                        Current Value
                    </Box>
                    <Box margin={{ bottom: 'xxxs' }} color="text-label" textAlign="center" fontSize="heading-xl">
                        { !value && 
                            <Spinner size="normal" />
                        }
                        {
                            value && current.current
                        }
                    </Box>
                </div>
                <div>
                    <Box margin={{ bottom: 'xxxs' }} color="text-label" fontSize="heading-s">
                        Min
                    </Box>
                    <Box margin={{ bottom: 'xxxs' }} color="text-label" textAlign="center" fontSize="heading-xl">
                        { !value && 
                            <Spinner size="normal" />
                        }
                        {
                            value && min.current
                        }
                    </Box>
                </div>
                <div>
                    <Box margin={{ bottom: 'xxxs' }} color="text-label" fontSize="heading-s">
                        Max
                    </Box>
                    <Box margin={{ bottom: 'xxxs' }} color="text-label" textAlign="center" fontSize="heading-xl">
                        { !value && 
                            <Spinner size="normal" />
                        }
                        {
                            value && max.current
                        }
                    </Box>
                </div>
                <div>
                    <Box margin={{ bottom: 'xxxs' }} color="text-label" fontSize="heading-s">
                        Avg
                    </Box>
                    <Box margin={{ bottom: 'xxxs' }} color="text-label" textAlign="center" fontSize="heading-xl">
                        { !value && 
                            <Spinner size="normal" />
                        }
                        {
                            value && avg.current
                        }
                    </Box>
                </div>
            </ColumnLayout>
        </Container>
    )
}

export default SensorValuePanel;