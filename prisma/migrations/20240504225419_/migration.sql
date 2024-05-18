BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Escola] (
    [id] INT NOT NULL IDENTITY(1,1),
    [nome] NVARCHAR(255) NOT NULL,
    [email] NVARCHAR(255) NOT NULL,
    [provincia] NVARCHAR(255) NOT NULL,
    [numeroDeSala] INT NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [Escola_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [Escola_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
