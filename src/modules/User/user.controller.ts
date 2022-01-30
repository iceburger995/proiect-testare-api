import { Body, Controller, Get, HttpStatus, Inject, NotFoundException, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'auth/Guards/jwt-auth.guard';

import { UserDTO } from './user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('/users')
@ApiTags('Users')
export class UserController {
  @Inject()
  protected service: UserService;

  @Get()
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  findAll(): Promise<any> {
    return this.service.findAll();
  }

  @Get('/:id')
  @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  get(@Param('id') id: number): Promise<UserDTO> {
    return this.service.get(id).then((data) => {
      if (data) {
        return data;
      }
      throw new NotFoundException();
    });
  }

  @Post()
  @ApiBody({ type: UserDTO })
  @ApiResponse({ status: HttpStatus.CREATED, type: UserDTO })
  async create(@Body() data: UserDTO): Promise<UserDTO | undefined> {
    return this.service.create(data);
  }

  //   @Put('/:id')
  //   @ApiBody({ type: UserDTO })
  //   @ApiResponse({ status: HttpStatus.OK, type: UserDTO })
  //   @HttpCode(HttpStatus.OK)
  //   update(@Param('id') id: number, @Body() data: UserDTO): Promise<UserDTO> {
  //     return super.update(id, data);
  //   }

  //   @Delete('/:id')
  //   @ApiResponse({ status: HttpStatus.NO_CONTENT })
  //   @HttpCode(HttpStatus.NO_CONTENT)
  //   delete(@Param('id') id: number): Promise<void> {
  //     return super.delete(id);
  //   }
}
