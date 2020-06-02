import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Sensor {
  readonly id: string;
  readonly name: string;
  readonly value: number;
  readonly latitude: number;
  readonly longitude: number;
  readonly status: number;
  readonly timestamp: number;
  constructor(init: ModelInit<Sensor>);
  static copyOf(source: Sensor, mutator: (draft: MutableModel<Sensor>) => MutableModel<Sensor> | void): Sensor;
}