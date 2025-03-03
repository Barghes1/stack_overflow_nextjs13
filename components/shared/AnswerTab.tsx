import { getUserAnswers } from '@/lib/actions/user.action'
import { SearchParamsProps } from '@/types'
import QuestionCard from './cards/QuestionCard'
import AnswerCard from './cards/AnswerCard'
import Pagination from './Pagination'

interface Props extends SearchParamsProps {
  userId: string,
  clerkId?: string | null
}


const AnswerTab = async ({searchParams, userId, clerkId}: Props) => {
  const result = await getUserAnswers({ userId, page: searchParams.page ? +searchParams.page : 1 })


  return (
    <>
        {result.answers.map((answer) => (
            <AnswerCard 
                key={answer._id}
                _id={answer._id}
                clerkId={clerkId}
                author={answer.author}
                upvotes={answer.upvotes}
                createdAt={answer.createdAt}
                question={answer.question}
            />
        ))}

        <Pagination 
            pageNumber={searchParams?.page ? +searchParams.page : 1}
            isNext={result.isNextAnswers}
        />
    </>
  )
}

export default AnswerTab