import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../interfaces';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  name: string;
  @Output() categoryCreated = new EventEmitter<ICategory>();
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }

  onCreate() {
    this.categoryService.createCategory(this.name).subscribe((c) => {
      this.categoryCreated.emit(c);
    });
  }

}
