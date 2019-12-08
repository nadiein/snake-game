import { Component, OnInit } from '@angular/core';
import { Snake } from './snake.model';
import { Utils } from '../utils/utils';

@Component({
    selector: 'snake',
    templateUrl: './snake.component.html',
    styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {

    snake:Snake;

    constructor() { }

    ngOnInit() { }

}
