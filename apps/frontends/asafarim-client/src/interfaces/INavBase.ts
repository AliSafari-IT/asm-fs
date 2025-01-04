export interface INavBase {
  id: string;
  title?: string;
  name: string;
  label?: string;
  description?: string;
  to?: string;
  slug?: string;
  icon?: React.ReactElement;
  className?: string;
  style?: React.CSSProperties;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  isDeleted?: boolean;
  isPublished?: boolean;
  isArchived?: boolean;
  isDraft?: boolean;
  isHidden?: boolean;
  isPrivate?: boolean;
  isProtected?: boolean;
  isRestricted?: boolean;
  isReadonly?: boolean;
  isEditable?: boolean;
  isUpdatable?: boolean;
  isDeletable?: boolean;
  isArchivable?: boolean;
  isPublishedAt?: Date;
  isArchivedAt?: Date;
  isDeletedAt?: Date;
  isDraftAt?: Date;
  isHiddenAt?: Date;
  isPrivateAt?: Date;
  isProtectedAt?: Date;
  isRestrictedAt?: Date;
  isReadonlyAt?: Date;
  isEditableAt?: Date;
  isUpdatableAt?: Date;
  isDeletableAt?: Date;
  isArchivableAt?: Date;
  isPublishedBy?: string;
  isArchivedBy?: string;
  isDeletedBy?: string;
  isDraftBy?: string;
  isHiddenBy?: string;
  isPrivateBy?: string;
  isProtectedBy?: string;
  isRestrictedBy?: string;
  isReadonlyBy?: string;
  isEditableBy?: string;
  isUpdatableBy?: string;
  isDeletableBy?: string;
  isArchivableBy?: string;
  isPublishedAtBy?: string;
  isArchivedAtBy?: string;
  isDeletedAtBy?: string;
  isDraftAtBy?: string;
  isHiddenAtBy?: string;
  isPrivateAtBy?: string;
  isProtectedAtBy?: string;
  isRestrictedAtBy?: string;
  isReadonlyAtBy?: string;
  isEditableAtBy?: string;
  isUpdatableAtBy?: string;
  isDeletableAtBy?: string;
  isArchivableAtBy?: string;
  isPublishedByUserId?: string;
  isArchivedByUserId?: string;
  isDeletedByUserId?: string;
  isDraftByUserId?: string;
  isHiddenByUserId?: string;
  isPrivateByUserId?: string;
  isProtectedByUserId?: string;
  isRestrictedByUserId?: string;
  isReadonlyByUserId?: string;
  isEditableByUserId?: string;
  isUpdatableByUserId?: string;
  isDeletableByUserId?: string;
  isArchivableByUserId?: string;
  isExpanded?: boolean;
  isExpandedByDefault?: boolean;
  isCollapsed?: boolean;
  isCollapsedByDefault?: boolean;
}