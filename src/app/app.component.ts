import { Component } from '@angular/core';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { jsPDF } from "jspdf";
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Practico01';
  empleados=[];
  employ:any;
  subtotal:number;
  contador:number=0;
  contador2:number=0;
  name:string;
  descuento:number = 0;
  cont1:number = 0;
  cont2:number = 0;
  cont3:number = 0;
  cont4:number = 0;
  cont5:number = 0;
  total1:number = 0;
  total2:number = 0;
  total3:number = 0;
  total4:number = 0;
  total5:number = 0;
  tot:number;
  subt:number;
  final:number;
  endo:string;

  lista:string[]=["Soda 1.25 L","Lata con atún","Botella con agua", "Cartón de huevos", "Botella de vino"];
  
  aviso(){
    let nombre:HTMLInputElement = document.querySelector('#nombrec');
    let dui:HTMLInputElement = document.querySelector('#duic');
    let visitas:HTMLInputElement = document.querySelector('#visit');
    let combo:HTMLInputElement = document.querySelector('#combo');
    let precio:HTMLInputElement = document.querySelector('#ppro2');

    if(nombre.value === '' || dui.value === '' || visitas.value === '') { alert("No puedes dejar campos en blanco") }
    else if(parseInt(dui.value) <= 0 || parseInt(visitas.value) <= 0){ alert("DUI o visitas mayor a cero, por favor") }
    else if(parseInt(combo.value) == 0) alert("Debes seleccionar un producto");
    else {
      if(parseInt(visitas.value) == 2) this.descuento = 0.05;
      else if (parseInt(visitas.value) == 3) this.descuento = 0.05;
      else if (parseInt(visitas.value) == 4) this.descuento = 0.05;
      else if (parseInt(visitas.value) > 4) this.descuento = 0.10;
      else this.descuento = 0;
      if (combo.value == 'Soda 1.25 L'){
        this.cont1++;
        this.total1 = parseFloat(precio.value)*this.cont1;
      }else if (combo.value == 'Lata con atún'){
        this.cont2++;
        this.total2 = parseFloat(precio.value)*this.cont2;
      }else if (combo.value == 'Botella con agua'){
        this.cont3++;
        this.total3 = parseFloat(precio.value)*this.cont3;
      }else if (combo.value == 'Cartón de huevos'){
        this.cont4++;
        this.total4 = parseFloat(precio.value)*this.cont4;
      }else if (combo.value == 'Botella de vino'){
        this.cont5++;
        this.total5 = parseFloat(precio.value)*this.cont5;
      }
      if(this.descuento == 0.05){
        this.tot = this.total1 + this.total2 + this.total3 + this.total4 + this.total5;
        this.subtotal = this.tot*this.descuento;
        this.final = this.tot - this.subtotal;
        this.endo = this.final.toFixed(2);
      }else if(this.descuento == 0.10){
        this.tot = this.total1 + this.total2 + this.total3 + this.total4 + this.total5;
        this.subtotal = this.tot*this.descuento;
        this.final = this.tot - this.subtotal;
        this.endo = this.final.toFixed(2);
      }else if(this.descuento == 0){
        this.tot = this.total1 + this.total2 + this.total3 + this.total4 + this.total5;
        this.final = this.tot;
        this.endo = this.final.toFixed(2);
      }
      this.name = nombre.value;
      this.employ={"nombre":nombre.value,"producto":combo.value,"precio":precio.value,"descuento":this.descuento}
      this.empleados.push(this.employ);
      this.contador++;
    } 
  }

  public captureScreen()  
  {  
    var data = document.getElementById('GG');  
    html2canvas(data).then(canvas => {  
      var imgWidth = 100;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jsPDF('p', 'mm', 'a4'); 
      var position = 70;  
      pdf.addImage(contentDataURL, 'PNG', 10, position, imgWidth, imgHeight)  
      pdf.text("Tienda Don diego", 90, 20);
      pdf.text("Cliente: " + this.name, 10, 30);
      pdf.text("Descuento aplicado: " + (this.descuento*100) + "%", 10, 40);
      pdf.text("Total a pagar: $" + this.endo, 10, 50);
      pdf.text("Listado de productos", 10, 60);
      pdf.save('Ticket.pdf');
      location.reload();
    });  
  } 
}
