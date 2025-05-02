import fs from 'fs';
import * as tf from '@tensorflow/tfjs';
import * as use from '@tensorflow-models/universal-sentence-encoder';

// Load the model.
use.load().then(async model => {
    const sentences = [
        'Hello.',
        'How are you?'
    ];
    const embeddings = await model.embed(sentences);
    console.log(embeddings.arraySync());
});
