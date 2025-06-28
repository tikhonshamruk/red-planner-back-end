import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../quards/jwt.quard";

export const Auth = () => UseGuards(JwtAuthGuard)