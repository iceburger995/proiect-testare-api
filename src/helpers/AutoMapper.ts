import { Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

export class AutoMapper {
  static getViewModel<Source, Destination>(
    source: Source,
    dType: Type<Destination>,
    map?: (result: Destination, source: Source) => void
  ): Destination {
    const result = plainToClass(dType, source, {
      ignoreDecorators: true,
      excludePrefixes: ['serviceId'],
    });

    map?.(result, source);

    return result;
  }

  static getEntity<Source, Destination>(
    source: Source,
    dType: Type<Destination>,
    map?: (result: Destination, source: Source) => void
  ): Destination {
    const result = plainToClass(dType, source, {
      ignoreDecorators: true,
    });

    map?.(result, source);

    return result;
  }
}
