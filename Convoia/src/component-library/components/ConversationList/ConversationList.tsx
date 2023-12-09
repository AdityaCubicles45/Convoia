import type React from "react";
import { Virtuoso } from "react-virtuoso";
import { EmptyMessage } from "../EmptyMessage/EmptyMessage";
import { MessagePreviewCard } from "../MessagePreviewCard/MessagePreviewCard";

interface ConversationListProps {

  messages?: Array<React.ReactNode>;

  isLoading?: boolean;

  setStartedFirstMessage?: () => void;

  hasRecipientEnteredValue?: boolean;
}

export const ConversationList = ({
  messages = [],
  isLoading,
  setStartedFirstMessage,
  hasRecipientEnteredValue,
}: ConversationListProps) =>
  !messages?.length && isLoading ? (
    <div className="w-full overflow-hidden h-full flex flex-col justify-start sm:w-full bg-gray-100">
      {Array.from({ length: 12 }).map((_, idx) => (
        <MessagePreviewCard key={idx} isLoading />
      ))}
    </div>
  ) : !messages.length && !isLoading && !hasRecipientEnteredValue ? (
    <div className="w-full overflow-hidden sm:w-full sm:p-4 md:p-8 border border-gray-100 h-full">
      <EmptyMessage setStartedFirstMessage={setStartedFirstMessage} />
    </div>
  ) : (
    <Virtuoso
      className="sm:w-full flex flex-col h-full bg-gray-100 border-x"
      data-testid="conversations-list-panel"
      data={messages}
      itemContent={(index, message) => message}
    />
  );