"use client";

import { SearchMail } from "./SearchMail";
import MailList from "./MailList";
import { useEffect, useState } from "react";
import { getMails } from "@/lib/api/mailService";
import { useDebounce } from "use-debounce";
import { Mail } from "@common/index";

interface MailClientContainerProps {
  mails: Mail[];
}

export const MailClientContainer = ({ mails }: MailClientContainerProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [filteredMails, setFilteredMails] = useState(mails);
  const [isSearching, setIsSearching] = useState(false);

  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedSearchValue.trim()) {
        setIsSearching(true);
        try {
          const searchResults = await getMails({
            search: debouncedSearchValue,
          });
          setFilteredMails(searchResults);
        } catch (error) {
          console.error("Search failed:", error);
          setFilteredMails([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setFilteredMails(mails);
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedSearchValue, mails]);

  return (
    <>
      <SearchMail
        searchValue={searchValue}
        onSearchValueChange={(value) => setSearchValue(value)}
        isPending={isSearching}
      />
      <MailList mails={filteredMails} />
    </>
  );
};
