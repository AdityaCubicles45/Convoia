import type { KeyboardEventHandler } from "react";
import { useMemo, useCallback } from "react";
import type {
  Attachment,
  RemoteAttachment,
} from "@xmtp/content-type-remote-attachment";
import type { CachedMessage } from "@xmtp/react-sdk";
import { useAttachment } from "@xmtp/react-sdk";
import Zoom from "react-medium-image-zoom";
import { useTranslation } from "react-i18next";
import { PaperClipIcon } from "@heroicons/react/outline";
import {
  getContentTypeFromFileName,
  humanFileSize,
} from "../../../helpers/attachments";
import "react-medium-image-zoom/dist/styles.css";

type RemoteAttachmentMessageTileProps = {
  message: CachedMessage;
  isSelf: boolean;
};