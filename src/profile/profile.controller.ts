import { Controller, Get, Put, Query, Body } from '@nestjs/common';
import { ProfileService, Profile } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getProfile(
    @Query('id') id: string,
  ): Promise<Profile[] | { message: string }> {
    if (!id) return { message: 'ID is required' };
    return this.profileService.getProfileById(id); // ✅ fix di sini
  }

  @Put()
  async updateUser(@Query('id') id: string, @Body() data: Profile) {
    if (!id) return { message: 'ID is required' };
    await this.profileService.updateUser(id, data); // ✅ fix di sini
    return { message: 'Profile updated successfully' };
  }
}
