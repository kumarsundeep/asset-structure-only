import { Component, OnInit} from '@angular/core';
import { DataService } from '../../../services/data.service';
import { IDevices } from '../../../shared/interfaces/device.interface';
import { IDevicesInt } from '../../../shared/interfaces/device-interface.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import { ModalDirective } from 'ng2-bootstrap/modal';
import {Modal} from 'ngx-modal';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  devices: IDevices[];
  interfaces: IDevicesInt[];
  deviceId: number;
  deviceName: string;
  deviceIp: string;
  selectedDevice = '';
  interfaceData: string;
  noOfInterfaces = 0;

  rForm: FormGroup;
  interfaceName: string;
  interfaceDesc: string;
  interfaceIp: string;
  validMsg = 'This field is required';
  validIpMsg= 'Required IP Address is not correct';
  interfaceDetails: any;
  postData: string;

  deviceForm: FormGroup;
  deviceDetails: any;
  deviceData: string;

  editForm: FormGroup;
  einterfaceName: string;
  einterfaceDesc: string;
  einterfaceIp: string;
  einterfaceDetails: any;
  editData: string;
  ipValid = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

  overview = true;
  deviceList = false;

  constructor( private dataService: DataService, private fb: FormBuilder ) {
    this.rForm = fb.group({
      'interfaceName' : [null, Validators.required],
      'interfaceDesc' : [null, Validators.required],
      'interfaceIp' : [null, Validators.compose([Validators.required, Validators.pattern(this.ipValid)])]
    });
    this.deviceForm = fb.group({
      'deviceName' : [null, Validators.required],
      'deviceIp' : [null, Validators.compose([Validators.required, Validators.pattern(this.ipValid)])]
    });
    this.editForm = fb.group({
      'einterfaceName' : [null, Validators.required],
      'einterfaceDesc' : [null, Validators.required],
      'einterfaceIp' : [null, Validators.compose([Validators.required, Validators.pattern(this.ipValid)])]
    });
  }

  ngOnInit() {
    //show devices on init
    this.dataService.getDevices().subscribe(
      (devices) => {this.devices = devices},
      error => alert(error),
      () => console.log("devices populated...")
      );
      
  }
  
  
  //Show Interfaces
  showInterfaces(id,name){
    this.overview = false;
    this.deviceList = true;

    this.dataService.getInterfaces(id).subscribe(
      
      (interfaces) => {this.interfaces = interfaces} ,
      error => alert(error),
      () => this.noOfInterfaces = this.interfaces.length.valueOf()
      );
    this.deviceId = id;
    this.deviceName = name;
    this.selectedDevice = name;
  }

  //Show Overview
  showOverview(){
    this.selectedDevice = '';
    this.deviceList = false;
    this.overview = true;
  }

  //Add Interface
  addInterface(interfaceDetailsPost){

    this.interfaceName = interfaceDetailsPost.interfaceName;
    this.interfaceDesc = interfaceDetailsPost.interfaceDesc;
    this.interfaceIp = interfaceDetailsPost.interfaceIp;

    this.interfaceDetails = {ipCode: this.interfaceIp, deviceId: this.deviceId, name: this.interfaceName, description: this.interfaceDesc};

    this.dataService.postInterfaces(this.interfaceDetails).subscribe(

      resp => this.interfaceData = JSON.stringify(resp),
      
      error => alert(error),
      () =>

      this.dataService.getInterfaces(this.deviceId).subscribe(
        (interfaces) => {this.interfaces = interfaces} ,
        error => alert(error),
        () => {this.rForm.reset(); this.noOfInterfaces = this.interfaces.length.valueOf();}
      )
    );

  }

  //Add Device
  addDevice(deviceDetailsPost){

    this.deviceName = deviceDetailsPost.deviceName;
    this.deviceIp = deviceDetailsPost.deviceIp;

    this.deviceDetails = {loopback: this.deviceIp, name: this.deviceName};

    this.dataService.postDevices(this.deviceDetails).subscribe(

      resp => this.deviceData = JSON.stringify(resp),
      error => alert(error),
      () =>

      this.dataService.getDevices().subscribe(
        (devices) => {this.devices = devices} ,
        error => alert(error),
        () => this.rForm.reset()
      )
    );
  }

  //Edit Interface
  editInterface(einterfaceDetailsPost,id){
    this.einterfaceName = einterfaceDetailsPost.einterfaceName;
    this.einterfaceDesc = einterfaceDetailsPost.einterfaceDesc;
    this.einterfaceIp = einterfaceDetailsPost.einterfaceIp;

    this.einterfaceDetails = {ipCode: this.einterfaceIp, deviceId: this.deviceId, name: this.einterfaceName, description: this.einterfaceDesc};

    this.dataService.updateInterfaces(this.einterfaceDetails,id).subscribe(

      resp => this.editData = JSON.stringify(resp),
      error => alert(error),
      () =>

      this.dataService.getInterfaces(this.deviceId).subscribe(
        (interfaces) => {this.interfaces = interfaces} ,
        error => alert(error)
      )
    );

  }

  //Delete Interface
  removeInterface(id){
    this.dataService.deleteInterface(id).subscribe(
      interfaces => this.interfaceData = JSON.stringify(interfaces),
      error => alert(error),
      () => this.dataService.getInterfaces(this.deviceId).subscribe(
        (interfaces) => {this.interfaces = interfaces} ,
        error => alert(error),
        () => this.noOfInterfaces = this.interfaces.length.valueOf()
      )
      );
  }

}
