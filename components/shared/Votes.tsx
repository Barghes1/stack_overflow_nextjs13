"use client"

import { toast } from '@/hooks/use-toast'
import { downvoteAnswer, upvoteAnswer } from '@/lib/actions/answer.action'
import { viewQuestion } from '@/lib/actions/interaction.action'
import { downvoteQuestion, upvoteQuestion } from '@/lib/actions/question.action'
import { toggleSaveQuestion } from '@/lib/actions/user.action'
import { formatLargeNumber } from '@/lib/utils'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

interface Props {
  type: string
  itemId: string
  userId: string
  upvotes: number
  downvotes: number
  hasupVoted: boolean
  hasdownVoted: boolean
  hasSaved?: boolean
}

const Votes = ({ type, itemId, userId, upvotes, downvotes, hasupVoted, hasdownVoted, hasSaved  }: Props) => {
  const pathname = usePathname()
  // const router = useRouter()

  const handleVote = async (action: string) => {
    if(!userId)
    {
      return toast({
        title: 'Please sign in',
        description: 'You need to sign in to vote',
      })
    }

    if(action === "upvote")
    {
      if(type === 'Question')
      {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      } else if(type === 'Answer')
      {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }

      // TODO: show a toast

      return toast({
        title: `Upvote ${!hasupVoted ? 'Successfully' : 'Removed'}`,
        variant: !hasupVoted ? 'default' : 'destructive',
      })
    }

    if(action === "downvote") {
      if(type === 'Question')
      {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      } else if(type === 'Answer')
      {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasupVoted,
          hasdownVoted,
          path: pathname,
        })
      }

      return toast({
        title: `Downvote ${!hasupVoted ? 'Successfully' : 'Removed'}`,
        variant: !hasupVoted ? 'default' : 'destructive',
      })
    }

  }

  const handleSave = async () => {
    await toggleSaveQuestion({
      userId: JSON.parse(userId),
      questionId: JSON.parse(itemId),
      path: pathname,
    })

    return toast({
      title: `Question ${!hasSaved ? 'Saved in' : 'Removed from'} your collection`,
      variant: !hasSaved ? 'default' : 'destructive',
    })
  }

  useEffect(() => {
    viewQuestion({
      questionId: JSON.parse(itemId),
      userId: userId ? JSON.parse(userId) : undefined,
    })

  }, [itemId, userId, pathname])

  return (
    <div className='flex gap-5'>
      <div className='flex-center gap-2.5'>
        <div className='flex-center gap-1.5'>
          <Image 
            src={hasupVoted ? "/assets/icons/upvoted.svg" : "/assets/icons/upvote.svg"}
            alt="Upvote"
            width={18}
            height={18}
            className='cursor-pointer'
            onClick={() => handleVote('upvote')}
          />

          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatLargeNumber(upvotes === undefined ? 0 : upvotes)}
            </p>
          </div>
        </div>

        <div className='flex-center gap-1.5'>
          <Image 
            src={hasdownVoted ? "/assets/icons/downvoted.svg" : "/assets/icons/downvote.svg"}
            alt="Downvote"
            width={18}
            height={18}
            className='cursor-pointer'
            onClick={() => handleVote('downvote')}
          />

          <div className='flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1'>
            <p className='subtle-medium text-dark400_light900'>
              {formatLargeNumber(downvotes === undefined ? 0 : downvotes)}
            </p>
          </div>
        </div>
      </div>

          {type === 'Question' && <Image 
            src={hasSaved ? "/assets/icons/star-filled.svg" : "/assets/icons/star-red.svg"}
            alt="Star"
            width={18}
            height={18}
            className='cursor-pointer'
            onClick={handleSave}
          />}

    </div>
  )
}

export default Votes