import { pipelineService } from './facebook.service';
import { ADS_INSIGHTS, COUNTRY_INSIGHTS } from './pipeline.const';

const cases = [ADS_INSIGHTS, COUNTRY_INSIGHTS];

describe('Facebook Service', () => {
    it.each(cases)('Pipeline Service $name', async (pipeline) => {
        const options = {
            accountId: '207616922697580',
            start: '2022-12-01',
            end: '2023-01-01',
        };

        return pipelineService(options, pipeline).then((res) => expect(res).toBeTruthy());
    });
});
