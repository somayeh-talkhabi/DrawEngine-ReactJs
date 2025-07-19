-- CreateTable
CREATE TABLE "draws" (
    "draw_id" SERIAL NOT NULL,
    "prize_id" INTEGER,
    "winning_postalcode" VARCHAR(255),

    CONSTRAINT "draws_pkey" PRIMARY KEY ("draw_id")
);

-- CreateTable
CREATE TABLE "prizes" (
    "prize_id" SERIAL NOT NULL,
    "amount_in_cents" INTEGER,

    CONSTRAINT "prizes_pkey" PRIMARY KEY ("prize_id")
);

-- CreateTable
CREATE TABLE "tickets" (
    "ticket_id" SERIAL NOT NULL,
    "postalcode" VARCHAR(255),
    "username" VARCHAR(255),
    "housenumber" VARCHAR(255),
    "city" VARCHAR(255),
    "amount_of_tickets" INTEGER,

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("ticket_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tickets_username_key" ON "tickets"("username");

-- AddForeignKey
ALTER TABLE "draws" ADD CONSTRAINT "prize_id_fk" FOREIGN KEY ("prize_id") REFERENCES "prizes"("prize_id") ON DELETE SET NULL ON UPDATE NO ACTION;
