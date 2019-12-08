import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { SnakeComponent } from './components/snake/snake.component';

@NgModule({
    declarations: [
        AppComponent,
        GridComponent,
        SnakeComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
