use anchor_lang::prelude::*;

declare_id!("7MFsykToLeEHYmfsxid2d7Fc9K1LApTB2y7QnGmfoZXX");

#[program]
pub mod amm {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
