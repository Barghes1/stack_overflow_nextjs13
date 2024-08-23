'use server';

import { ViewQuestionParams } from '@/lib/actions/shared.types';
import { connectToDatabase } from '@/lib/mongoose';
import Question from '@/database/question.model';
import Interaction from '@/database/interaction.model';

export async function viewQuestion(params: ViewQuestionParams) {
    try {
        await connectToDatabase();

        const { userId, questionId } = params;

        // Update the question view count
        await Question.findByIdAndUpdate(questionId, {
            $inc: { views: 1 },
        });

        if (userId) {
            const existingInteraction = await Interaction.findOne({
                user: userId,
                action: 'view',
                question: questionId,
            });

            if (existingInteraction) {
                return console.log('User already interacted with the question');
            }

            await Interaction.create({
                user: userId,
                action: 'view',
                question: questionId,
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
