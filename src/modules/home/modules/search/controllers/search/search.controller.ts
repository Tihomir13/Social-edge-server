import { Controller, Get, Query, Req, Res } from '@nestjs/common';
import { SearchService } from '../../search.service';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get(':searchedText')
    async searchProfile(
        @Query() userData: any,
        @Res() res: Response,
        @Req() req: any,
      ) {
        userData.userId = req.user?.id;
        userData.username = req.user?.username;
        userData.searchedText = req.params.searchedText;
        
        return this.searchService.searchProfile(userData, res);
      }
}
