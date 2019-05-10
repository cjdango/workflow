import { Component, OnInit, Input } from '@angular/core';
import { EventForm } from 'src/app/commons/forms/feed.forms';
import { Event } from 'src/app/commons/models/feed.models';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit {
  @Input() eventDate: Date;
  private form : EventForm;

  constructor() {}

  ngOnInit() {
    this.form = new EventForm(new Event);
    this.form.defaultValue({ event_date: this.eventDate });
  }

}
