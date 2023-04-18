import {Component, OnInit} from '@angular/core';
import {AbstractControl, NonNullableFormBuilder, Validators,} from '@angular/forms';
import {UserService} from 'app/services/user.service';
import {DatePipe, Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';
import {cpf} from 'cpf-cnpj-validator';
import {User} from 'app/models/user.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: [],
  providers: [DatePipe],
})
export class UserRegisterComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: ['', [Validators.required]],
    birthDate: [
      new Date(),
      [Validators.required, validateBirthDate.bind(this)],
    ],
    cpf: [
      '',
      [
        Validators.required,
        Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),
        cpfValidator,
      ],
    ],
    phone: ['', [Validators.required]],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: UserService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const user: User | null = this.route.snapshot?.data?.['user'] ?? null;

    if (user) {
      this.form.setValue({
        _id: user._id,
        name: user.name,
        birthDate: new Date(user.birthDate),
        cpf: user.cpf,
        phone: user.phone,
        email: user.email,
        password: user.password,
      });
    } else {
      // handle the case where user is null or undefined
    }
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(),
      (error) => this.onError()
    );
  }

  private onSuccess() {
    console.log('cadastrado');
  }

  private onError() {
    console.log('erro!');
  }

  onCancel() {
    this.location.back();
  }

  public cpfIsValid(cpf: string): boolean {
    return cpfValidator({ value: cpf }) === null;
  }
}

export function cpfValidator(control: any) {
  const isValid = cpf.isValid(control.value);
  return isValid ? null : { cpf: true };
}

export function validateBirthDate(control: AbstractControl) {
  const datePipe = new DatePipe('pt-BR');
  const currentDate = new Date();
  const minDate = new Date(
    currentDate.getFullYear() - 18,
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const selectedDate = new Date(control.value);

  return selectedDate > minDate ? { invalidDate: true } : null;
}
