import { HttpFunction } from '@google-cloud/functions-framework/build/src/functions';
import Joi from 'joi';

import * as pipelines from './facebook/pipeline.const';
import { pipelineService } from './facebook/facebook.service';

type Body = {
    pipeline: keyof typeof pipelines;
    accountId: string;
    start?: string;
    end?: string;
};

export const main: HttpFunction = async (req, res) => {
    Joi.object<Body>({
        pipeline: Joi.string()
            .valid(...Object.keys(pipelines))
            .required(),
        accountId: Joi.string().required(),
        start: Joi.string().pattern(/\d{4}-\d{2}-\d{2}/),
        end: Joi.string().pattern(/\d{4}-\d{2}-\d{2}/),
    })
        .validateAsync(req.body)
        .then((body) => {
            return pipelineService(
                { accountId: body.accountId, start: body.start, end: body.end },
                pipelines[body.pipeline],
            );
        })
        .then((result) => {
            console.log('success', JSON.stringify(result));
            res.status(200).json({ result });
        })
        .catch((err) => {
            console.log('error', JSON.stringify(err));
            res.status(500).json({ err });
        });
};
