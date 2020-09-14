import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  fifthFormGroup;
  checked;
  gender;
  array = [];
  firstAnswer;
  secondAnswer = [];
  thirdAnswer;

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.firstFormGroup = new FormGroup({
      fname : new FormControl('', Validators.required),
      lname : new FormControl('', Validators.required),
      date : new FormControl('', Validators.required),
      country : new FormControl('', Validators.required),
      age : new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      terms: new FormControl('', Validators.required)
    })

    this.secondFormGroup = new FormGroup({
      satisfaction : new FormControl('', Validators.required),
    })

    this.thirdFormGroup = new FormGroup({
      hear : new FormControl('', Validators.required),
    })

    this.fourthFormGroup = new FormGroup({
      suggest: new FormControl('', Validators.required),
      describe: new FormControl('', Validators.required)
    })
  }

  onHear(event) {
    if(event.target.checked == true) {
      let value = document.getElementById(event.target.value)['value'];
      this.array.push(value)
      console.log(this.array)
    }
    // this.thirdFormGroup.controls.hear.patchValue(array);
  }

  onChange(event) {
    if (event.target.checked == false) {
      let element = document.getElementById('terms_and_conditions');
      element.style.border = 'solid red 1px'
      this.firstFormGroup.controls.terms.patchValue(false)
    } else {
      this.firstFormGroup.controls.terms.patchValue(true)
    }
  }

  getGender(event) {
    console.log(event.target.value)
    if (event.target.value == 'male') {
      this.firstFormGroup.controls.gender.patchValue('male')
    } else if (event.target.value == 'female') {
      this.firstFormGroup.controls.gender.patchValue('female')
    }
  }

  onSubmit() {

    const formData = new FormData();

    formData.append('fname', this.firstFormGroup.controls.fname.value)
    formData.append('lname', this.firstFormGroup.controls.lname.value)
    formData.append('date', this.firstFormGroup.controls.date.value)
    formData.append('country', this.firstFormGroup.controls.country.value)
    formData.append('age', this.firstFormGroup.controls.age.value)
    formData.append('gender', this.firstFormGroup.controls.gender.value)
    formData.append('terms', this.firstFormGroup.controls.gender.value)

    let object = {};
    formData.forEach((value, key) => {
      object[key] = value;
      if (object[key] == '' || object[key] == undefined) {
        let element = document.getElementById(key);
        element.style.border = 'solid red 1px'
      }
    })
    let json = object;

    console.log(this.firstFormGroup)
    if(this.firstFormGroup.status == 'INVALID') {
      this.toastrService.error('Please fill all fields and try again.')
    } else {
      // Show the new form
      let firstFormGroup = document.getElementById('firstFormGroup');
      firstFormGroup.style.display = 'none'
      let secondFormGroup = document.getElementById('secondFormGroup');
      secondFormGroup.style.display = 'block'
    }

  }

  goToFirst() {
    let firstFormGroup = document.getElementById('firstFormGroup');
    let secondFormGroup = document.getElementById('secondFormGroup');

    secondFormGroup.style.display = 'none';
    firstFormGroup.style.display = 'block'
  }

  goToSecond() {
    let secondFormGroup = document.getElementById('secondFormGroup');
    let thirdFormGroup = document.getElementById('thirdFormGroup');

    secondFormGroup.style.display = 'block';
    thirdFormGroup.style.display = 'none'
  }

  goToThird() {
    console.log(this.secondFormGroup)
    if (this.secondFormGroup.status == 'INVALID') {
      this.toastrService.error('Please ill all fields and try again.')
    } else {
      let secondFormGroup = document.getElementById('secondFormGroup');
      secondFormGroup.style.display = 'none'

      let thirdFormGroup = document.getElementById('thirdFormGroup');
      thirdFormGroup.style.display = 'block'
    }
  }

  goToFourth () {
    console.log(this.thirdFormGroup);
    if(this.thirdFormGroup.status == 'INVALID') {
      this.toastrService.error('Please ill all fields and try again.')
    } else {
      this.thirdFormGroup.controls.hear.patchValue(this.array)
      let thirdFormGroup = document.getElementById('thirdFormGroup');
      let fourthFormGroup = document.getElementById('fourthFormGroup');

      thirdFormGroup.style.display = 'none'
      fourthFormGroup.style.display = 'block';
    }
  }

  goToFifth() {
    console.log(this.fourthFormGroup);
    if(this.fourthFormGroup.status == 'INVALID') {
      this.toastrService.error('Please ill all fields and try again.')
    } else {
      let fourthFormGroup = document.getElementById('fourthFormGroup');
      let fifthFormGroup = document.getElementById('fifthFormGroup');

      fifthFormGroup.style.display = 'block'
      fourthFormGroup.style.display = 'none';
    }
    this.fifthFormGroup = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
      ...this.fourthFormGroup.value
    };


    let firstAnswer = this.fifthFormGroup['satisfaction'].toString().replace('-', ' ').split(' ');
    for (let i = 0; i < firstAnswer.length; i++) {
      firstAnswer[i] = firstAnswer[i].charAt(0).toUpperCase() + firstAnswer[i].slice(1)
    }
    this.firstAnswer = firstAnswer.join(' ')
    
    console.log(this.fifthFormGroup['hear'].length)
    for(let i = 0; i < this.fifthFormGroup['hear'].length; i++) {
      console.log( this.fifthFormGroup['hear'][i].toString().replace('-', ' ').split(' ') )
      let secondAnswer = this.fifthFormGroup['hear'][i].toString().replaceAll('-', ' ').split(' ');

      for(let j = 0; j < secondAnswer.length; j++) {
        secondAnswer[j] = secondAnswer[j].charAt(0).toUpperCase() + secondAnswer[j].slice(1);
      }
      console.log(secondAnswer.join(' '))
      this.secondAnswer.push(secondAnswer.join(' '))
    }

    console.log(this.secondAnswer)
    this.thirdAnswer = this.fifthFormGroup['suggest']

    console.log( this.firstAnswer )
    console.log( this.secondAnswer )
    console.log( this.thirdAnswer )
  }

  submitFifth() {
    
  }

}
