import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NoticeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotice(id: string) {
    return this.prismaService.notice
      .findUniqueOrThrow({
        // We have to modify this part later.
        where: { id: parseInt(id) },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('DB Error');
        }
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async createNotice(title: string, content: string) {
    return this.prismaService.notice
      .create({
        data: {
          title,
          content,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('DB Error');
        }
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async updateNotice(id: string, title: string, content: string) {
    return this.prismaService.notice
      .update({
        where: { id: parseInt(id) },
        data: {
          title,
          content,
        },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('DB Error');
        }
        throw new InternalServerErrorException('Unknown Error');
      });
  }

  async deleteNotice(id: string) {
    return this.prismaService.notice
      .delete({
        where: { id: parseInt(id) },
      })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          throw new InternalServerErrorException('DB Error');
        }
        throw new InternalServerErrorException('Unknown Error');
      });
  }
}
