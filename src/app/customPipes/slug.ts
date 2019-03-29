import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'slug' })
export class Slug implements PipeTransform {
    transform(title: string) {
        const urlSlug = title.trim().toLowerCase().replace(/ /g, '-');
        return urlSlug;
    }
}
