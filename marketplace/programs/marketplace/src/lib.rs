use anchor_lang::prelude::*;

declare_id!("Ci69V3skg2YNxNUeH7WonV8RV5TeY8FXWJFyiw8ZcpL6");

#[program]
pub mod marketplace {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
