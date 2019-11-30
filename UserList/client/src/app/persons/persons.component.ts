import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Person} from "./person";
import {PersonsService} from "./persons.service";

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  persons: Person[] = [];
  editPerson: Person;
  dataSource: MatTableDataSource<Person>;
  displayedColumns = ['id','name','patronymic','surname','phone','email','actions'];
  constructor(private personService: PersonsService) { }

  ngOnInit() {
    this.getPersons();
  }

  getPersons(){
    this.personService.getPersons().subscribe(persons => {
      if(!persons) {
        return
      }
      this.dataSource = new MatTableDataSource(persons);
      this.dataSource.paginator = this.paginator;
    })
  }

  add(name,patronymic,surname,phone,email: string) {
    this.editPerson = undefined;
    name = name.trim();
    patronymic = patronymic.trim()
    surname = surname.trim();
    phone = phone.trim();
    email = email.trim();
    if((!name)||(!patronymic)||(!surname)||(!phone)||(!email)){
      return
    }
    const newPerson: Person = {name, patronymic, surname, phone, email} as Person;
    this.personService.addPerson(newPerson).subscribe(person => {this.persons.push(person); this.getPersons()})
  }

  delete(person: Person) {
    this.persons = this.persons.filter(h => h != person)
    this.personService.deletePerson(person.id).subscribe(data => this.getPersons())
  }

  edit(person){
    this.editPerson = person;
  }

  update() {
    if(this.editPerson){
      this.personService.updatePerson(this.editPerson).subscribe(person =>{
        const ix = person ? this.persons.findIndex(h => h.id === person.id) : -1
        if (ix > -1){
          this.persons[ix] = person
        }
      })
      this.editPerson = undefined
    }
  }

}
