export class Feed {
  instance : Object = {};
  instance_type : string = null;

  constructor(data={}) {
    Object.assign(this, data);
  }
}

export class Event {
  title         : string = null;
  content       : string = null;
  participants  : Array<object> = null;
  event_date    : Date = null;
  start_time    : Date = null;
  end_time      : Date = null;
  frequency?    : string = null;


  constructor(data = {}) {
    Object.assign(this, data);
  }
}
