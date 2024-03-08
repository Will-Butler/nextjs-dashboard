'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  //debounceCallback will only run function if it gets 300 ms of peace (aka user stops typing for 3 seconds)
  const handleSearch = useDebouncedCallback((term) => {
    //Create params object using this api to manipulate URL 
    //query parameters more easily than a complex string literal (?page=1?query=a)
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    //Use content from user search to directly edit the URL params
    //Next won't reload page due to client-side nav
    replace(`${pathname}?${params.toString()}`);

  }, 300);
  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        //defaultValue vs value: 
        //val is when React manages state of input, this is a controlled component; 
        //defval means native input will manage its own state (URL is storing search query, not a state)
        defaultValue={searchParams.get('query')?.toString()} //keep url and input in sync
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
