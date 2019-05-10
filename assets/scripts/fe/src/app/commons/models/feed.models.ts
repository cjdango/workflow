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
  event_date    : string = null;
  start_time    : string = null;
  end_time      : string = null;
  frequency?    : string = null;


  constructor(data = {}) {
    Object.assign(this, data);
  }
}
