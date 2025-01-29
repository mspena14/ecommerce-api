import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpErrorFilter } from './common/filters/http-exceptions.filter';
import { ResponseFormatInterceptor } from './common/interceptors/response-format.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpErrorFilter());
  app.useGlobalInterceptors(new ResponseFormatInterceptor);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
