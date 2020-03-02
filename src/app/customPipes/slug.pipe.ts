import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slug'
})
export class SlugPipe implements PipeTransform {

  transform(title: string) {
    const urlSlug = title.trim().toLowerCase().replace(/ /g, '-');
    return urlSlug;
  }
}
