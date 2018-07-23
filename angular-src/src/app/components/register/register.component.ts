import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onRegisterSumbit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    

    //Campos requeridos
    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show("Llene todos los campos", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    //Validar Email
    if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show("Escriba el correo en formato de email", {cssClass: 'alert-danger', timeout:3000});
      return false;
    }

    // Registrar usuario
    this.authService.registerUser(user).subscribe(data =>{
      if(data.success){
        this.flashMessage.show("Ha sido registrado con éxito", {cssClass: 'alert-success', timeout:3000});
        this.router.navigate(['/login']);
      }else {
        this.flashMessage.show("Algo salió mal", {cssClass: 'alert-danger', timeout:3000});
        this.router.navigate(['/register']);
      }
    });

  }
}
