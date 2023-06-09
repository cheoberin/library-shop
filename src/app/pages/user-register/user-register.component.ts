import {Component, OnInit} from '@angular/core';
import {AbstractControl, NonNullableFormBuilder, Validators,} from '@angular/forms';
import {UserService} from 'app/services/user.service';
import {DatePipe, Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {cpf} from 'cpf-cnpj-validator';
import {IUser} from 'app/models/user.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: [],
  providers: [DatePipe],
})
export class UserRegisterComponent implements OnInit {
  spinner?:boolean;
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
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user: IUser | null = this.activeRoute.snapshot?.data?.['user'] ?? null;

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
    this.spinner = true;
    this.service.save(this.form.value).subscribe(
      (result) => this.onSuccess(result,this.form.value.email!),
      (error) => this.onError(error)
    );

  }

  private onSuccess(result: any,email:string) {
    localStorage.setItem('access_token', result.token);

    this.service.getCurrentUser(email);
    const fakeAsyncOperation = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("");
      }, 3000);
    });

    fakeAsyncOperation.then((userRes) => {
      this.spinner = false;
      this.router.navigate([''])
    }).catch((error) => {
      this.spinner = false;
    });

  }

  private onError(error: any) {
    console.log(error);
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
