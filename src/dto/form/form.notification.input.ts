import { Field, InputType } from '@nestjs/graphql'

@InputType('FormNotificationInput')
export class FormNotificationInput {
  @Field({ nullable: true })
  readonly subject?: string

  @Field({ nullable: true })
  readonly htmlTemplate?: string

  @Field({ nullable: true })
  readonly toField?: string

  @Field({ nullable: true })
  readonly fromEmail?: string

  @Field({ nullable: true })
  readonly fromField?: string

  @Field({ nullable: true })
  readonly toEmail?: string

  @Field()
  readonly enabled: boolean
}
