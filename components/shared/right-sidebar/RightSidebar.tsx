import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import RenderTag from '../RenderTag'
import { getHotQuestions } from '@/lib/actions/question.action'
import { getPopularTags } from '@/lib/actions/tag.actions'

const RightSidebar = async () => {
  const hotQuestions = await getHotQuestions();
  const popularTags = await getPopularTags();

  return (
    <section className='custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden'>
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {hotQuestions.map(question => (
            <Link
              key={question.id}
              className='flex items-center justify-between gap-7 cursor-pointer'
              href={`/question/${question.id}`}
            >
              <p className='body-medium text-dark500_light700'>{question.title}</p>
              <Image
                className='invert-colors'
                src="/assets/icons/chevron-right.svg"
                alt="Arrow right"
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>

        <div className='mt-16'>
          <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
          <div className='mt-7 flex flex-col gap-4'>
            {popularTags.map((item) => {
              return (
                <RenderTag
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  totalQuestions={item.numberOfQuestions}
                  showCount
                />
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default RightSidebar