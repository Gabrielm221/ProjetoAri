-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prescricao" (
    "id" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "observacao" TEXT,
    "id_remedio" INTEGER NOT NULL,
    "frequencia_valor" INTEGER NOT NULL,
    "frequencia_unidade" TEXT NOT NULL,
    "dt_inicio" TIMESTAMP(3) NOT NULL,
    "dt_fim" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Prescricao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Historico" (
    "id" SERIAL NOT NULL,
    "id_prescricao" INTEGER NOT NULL,
    "dt_atual" TIMESTAMP(3) NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Historico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Remedio" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "funcao" TEXT NOT NULL,
    "dosagem" DOUBLE PRECISION NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Remedio_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Prescricao" ADD CONSTRAINT "Prescricao_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescricao" ADD CONSTRAINT "Prescricao_id_remedio_fkey" FOREIGN KEY ("id_remedio") REFERENCES "Remedio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Historico" ADD CONSTRAINT "Historico_id_prescricao_fkey" FOREIGN KEY ("id_prescricao") REFERENCES "Prescricao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
