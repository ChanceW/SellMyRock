USE [master]
GO
/****** Object:  Database [Sellmyrock]    Script Date: 5/25/2020 10:16:27 AM ******/
CREATE DATABASE [Sellmyrock]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Sellmyrock', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Sellmyrock.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Sellmyrock_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\Sellmyrock_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [Sellmyrock] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Sellmyrock].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Sellmyrock] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Sellmyrock] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Sellmyrock] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Sellmyrock] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Sellmyrock] SET ARITHABORT OFF 
GO
ALTER DATABASE [Sellmyrock] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Sellmyrock] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Sellmyrock] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Sellmyrock] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Sellmyrock] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Sellmyrock] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Sellmyrock] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Sellmyrock] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Sellmyrock] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Sellmyrock] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Sellmyrock] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Sellmyrock] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Sellmyrock] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Sellmyrock] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Sellmyrock] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Sellmyrock] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Sellmyrock] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Sellmyrock] SET RECOVERY FULL 
GO
ALTER DATABASE [Sellmyrock] SET  MULTI_USER 
GO
ALTER DATABASE [Sellmyrock] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Sellmyrock] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Sellmyrock] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Sellmyrock] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Sellmyrock] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'Sellmyrock', N'ON'
GO
ALTER DATABASE [Sellmyrock] SET QUERY_STORE = OFF
GO
USE [Sellmyrock]
GO
/****** Object:  Table [dbo].[Quote]    Script Date: 5/25/2020 10:16:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Quote](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](250) NOT NULL,
	[Address] [nvarchar](250) NOT NULL,
	[Phone] [nvarchar](250) NOT NULL,
	[Shape] [nvarchar](250) NOT NULL,
	[Carat] [nvarchar](250) NOT NULL,
	[Color] [nvarchar](250) NOT NULL,
	[Clarity] [nvarchar](250) NOT NULL,
	[ReportNumber] [nvarchar](250) NOT NULL,
	[Certified] [nvarchar](250) NOT NULL,
	[Files] [nvarchar](max) NOT NULL,
	[CreatedDate] [datetime] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[procSaveQuote]    Script Date: 5/25/2020 10:16:27 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--DROP PROCEDURE [dbo].[procSaveQuote]
CREATE PROCEDURE [dbo].[procSaveQuote]
      @Name nvarchar(250),
      @Address nvarchar(250),
      @Phone nvarchar(250),
      @Shape nvarchar(250),
      @Carat nvarchar(250),
      @Color nvarchar(250),
	  @Clarity nvarchar(250),
	  @ReportNumber nvarchar(250),
	  @Certified nvarchar(250),
	  @Files nvarchar(Max)
AS
BEGIN
	  Declare @id int;
      INSERT INTO [dbo].[Quote] (Name, Address, Phone, Shape, Carat, Color, Clarity, ReportNumber, Certified, Files, CreatedDate)
      VALUES (@Name, @Address, @Phone, @Shape, @Carat, @Color, @Clarity, @ReportNumber, @Certified, @Files, GETDATE())
      SET @id=SCOPE_IDENTITY()
      RETURN  @id
END
GO
USE [master]
GO
ALTER DATABASE [Sellmyrock] SET  READ_WRITE 
GO
