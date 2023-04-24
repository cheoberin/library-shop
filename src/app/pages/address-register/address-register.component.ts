import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'app/models/address.model';
import { AddressService } from 'app/services/address.service';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import localePt from '@angular/common/locales/pt';
import { CurrentUserService } from 'app/services/current-user.service';

@Component({
  selector: 'app-address-register',
  templateUrl: './address-register.component.html',
  styles: [],
  providers: [DatePipe],
})
export class AddressRegisterComponent implements OnInit {
  cep: string = '';
  userId: string = '';

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: AddressService,
    private userService: CurrentUserService,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient
  ) {}

  form = this.formBuilder.group({
    _id: [''],
    userId: [this.userService.getUserId()],
    addressName: ['', [Validators.required]],
    cep: ['', [Validators.required]],
    street: ['', [Validators.required]],
    adjunct: ['', [Validators.required]],
    number: [0, [Validators.required]],
    district: ['', [Validators.required]],
    city: ['', [Validators.required]],
    uf: ['', [Validators.required]],
  });

  ngOnInit(): void {
    const address: Address | null =
      this.activeRoute.snapshot?.data?.['address'] ?? null;

    this.form.get('street')?.disable();
    this.form.get('district')?.disable();
    this.form.get('city')?.disable();
    this.form.get('uf')?.disable();

    if (address) {
      this.form.setValue({
        _id: address._id,
        userId: this.userService.getUserId(),
        addressName: address.addressName,
        cep: address.cep,
        street: address.street,
        district: address.district,
        city: address.city,
        uf: address.uf,
        number: address.number,
        adjunct: address.adjunct,
      });
    } else {
      // handle the case where user is null or undefined
    }
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result) => this.onSucess(result),
      (error) => this.onError(error)
    );
  }

  private onSucess(result : any){
    this.router.navigate(['cart']);
  }

  private onError(error : any){
    console.log(error);
  }

  onCancel(){
    this.location.back();
  }

  public lookAddress() {

    return this.httpClient
      .get(`https://viacep.com.br/ws/${this.cep}/json/`)
      .subscribe((address: any) => {
        this.form.controls['street'].setValue(address.logradouro);
        this.form.controls['district'].setValue(address.bairro);
        this.form.controls['city'].setValue(address.localidade);
        this.form.controls['uf'].setValue(address.uf);
      });
  }
}
