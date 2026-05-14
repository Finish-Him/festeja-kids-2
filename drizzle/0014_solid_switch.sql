CREATE TABLE `funcionarios_festa` (
	`id` int AUTO_INCREMENT NOT NULL,
	`festaId` int NOT NULL,
	`nome` varchar(255) NOT NULL,
	`telefone` varchar(20),
	`funcao` varchar(100) NOT NULL,
	`observacoes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `funcionarios_festa_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `observacoes_festa` (
	`id` int AUTO_INCREMENT NOT NULL,
	`festaId` int NOT NULL,
	`tipo` enum('geral','pagamento','decoracao','buffet','urgente') NOT NULL DEFAULT 'geral',
	`texto` text NOT NULL,
	`criadoPor` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `observacoes_festa_id` PRIMARY KEY(`id`)
);
