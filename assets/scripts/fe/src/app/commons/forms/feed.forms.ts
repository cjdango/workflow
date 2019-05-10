import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';


export class EventForm {
  public form: FormGroup;
  public submitted: Boolean = false;

  constructor (data) {
    /* Initialize the form builder
     */
    this.form = new FormBuilder().group({
      title             : new FormControl(data.title, [Validators.required]),
      content           : new FormControl(data.content, [Validators.required]),
      participants_id   : new FormControl(data.participants_id, [Validators.required]),
      event_date        : new FormControl(data.event_date, [Validators.required]),
      start_time        : new FormControl(data.start_time, [Validators.required]),
      end_time          : new FormControl(data.end_time, [Validators.required]),
      frequency         : new FormControl(data.frequency, [Validators.required]),
    });
  }

  /* Check if form field is valid
   */
  valid (f) {
    return !(!this.form.get(f).valid && (this.form.get(f).touched || this.submitted));
  }

  /* Check if the form field has an error
   */
  hasError (f, e) {
    return this.form.get(f).hasError(e) && (this.form.get(f).touched || this.submitted);
  }

  /* DEFAULT VALUE
   * set the value of the form fields if there is a default value.
   */
  defaultValue (d) {
    // set a timeout just incase that the value is not yet ready.
    this.form.patchValue(d);
  }

}
